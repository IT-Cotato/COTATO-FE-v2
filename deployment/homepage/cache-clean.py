"""새로 생성한 홈페이지 이미지 캐시만 정리하며 원본 파일과 업무 데이터에는 접근하지 않는다."""
import argparse,json,re,shutil,time
from pathlib import Path
MARKER='.managed-generated-cache-v1'
MARKER_VALUE='cotato-generated-image-cache-20261114-v1'
KEY=re.compile(r'^[A-Za-z0-9_-]{43}$')

def clean(root,max_bytes,target_bytes,min_free_bytes,quiet_seconds):
 # 1. 명시적으로 관리 표식을 만든 실제 디렉터리만 정리해 잘못된 경로의 삭제를 막는다.
 root=Path(root).absolute()
 if root!=root.resolve() or not root.is_dir() or root.is_symlink() or not (root/MARKER).is_file() or (root/MARKER).is_symlink() or (root/MARKER).read_text().strip()!=MARKER_VALUE:
  raise ValueError('관리표식 검증 실패: 정리하지 않음')
 now=time.time();records=[];skipped=0
 for p in root.iterdir():
  if p.name==MARKER:continue
  if p.is_symlink() or not p.is_dir() or not KEY.fullmatch(p.name):skipped+=1;continue
  files=[];unsafe=False
  for f in p.rglob('*'):
   if f.is_symlink():unsafe=True;break
   if f.is_file():files.append(f)
  if unsafe:skipped+=1;continue
  expires=[]
  for f in files:
   bits=f.name.split('.',2)
   if len(bits)<3 or not bits[0].isdigit() or not bits[1].isdigit():unsafe=True;break
   expires.append(int(bits[1])/1000)
  if unsafe:skipped+=1;continue
  st=p.stat();records.append({'path':p,'bytes':sum(f.stat().st_size for f in files),'mtime_ns':st.st_mtime_ns,'age':now-st.st_mtime,'expired':bool(expires) and all(x<now for x in expires)})
 removed_expired=0;removed_capacity=0;reclaimed=0;total=sum(x['bytes'] for x in records)
 def remove(item):
  nonlocal total,reclaimed
  p=item['path']
  # 2. 목록 수집 후 갱신된 디렉터리는 쓰기 중일 수 있으므로 다음 회차로 미룬다.
  if item['age']<quiet_seconds or not p.exists() or p.is_symlink() or p.stat().st_mtime_ns!=item['mtime_ns']:return False
  assert p.parent==root and KEY.fullmatch(p.name)
  shutil.rmtree(p);total-=item['bytes'];reclaimed+=item['bytes'];item['removed']=True;return True
 # 3. 만료된 파생 캐시를 우선 제거한다. 원본 이미지는 이 디렉터리에 없다.
 for item in records:
  if item['expired'] and remove(item):removed_expired+=1
 # 4. 용량 기준을 초과하면 오래전에 생성된 캐시부터 줄인다. 최근 쓰기 중 캐시는 보존한다.
 pressure=total>max_bytes or shutil.disk_usage(root).free<min_free_bytes
 if pressure:
  for item in sorted(records,key=lambda x:x['mtime_ns']):
   if total<=target_bytes and shutil.disk_usage(root).free>=min_free_bytes:break
   if not item.get('removed') and remove(item):removed_capacity+=1
 return {'만료정리수':removed_expired,'용량정리수':removed_capacity,'건너뛴항목수':skipped,'정리바이트':reclaimed,'잔여관리캐시바이트':total,'용량기준바이트':max_bytes,'용량기준초과잔여':total>max_bytes,'원본및DB접근':False}

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--root',default='/var/lib/cotato/homepage-image-cache-v108');parser.add_argument('--max-bytes',type=int,default=512*1024**2);parser.add_argument('--target-bytes',type=int,default=384*1024**2);parser.add_argument('--min-free-bytes',type=int,default=2*1024**3);parser.add_argument('--quiet-seconds',type=int,default=60);args=parser.parse_args()
 try:
  assert 0<=args.target_bytes<=args.max_bytes and args.min_free_bytes>=0 and args.quiet_seconds>=0
  print(json.dumps(clean(args.root,args.max_bytes,args.target_bytes,args.min_free_bytes,args.quiet_seconds),ensure_ascii=False))
 except Exception as e:
  print(json.dumps({'정리실행':False,'오류종류':type(e).__name__,'원문':'생략'},ensure_ascii=False));raise SystemExit(2)
