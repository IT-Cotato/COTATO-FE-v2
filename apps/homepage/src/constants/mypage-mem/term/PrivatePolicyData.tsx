import {TermsSection} from '@/constants/mypage-mem/term/terms';

export const PRIVACY_POLICY: TermsSection[] = [
  {
    title: '제1조 개인정보의 처리 목적',
    content: (
      <div className='text-body-l pl-3'>
        동아리는 다음의 목적을 위하여 개인정보를 처리하며, 목적 외 이용 시에는
        「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를
        이행합니다. <br />
        <span className='mt-2 block'>
          1. 회원 관리: 회원가입 의사 확인, 본인 식별·인증, 비밀번호 재설정,
          회원 자격 유지·관리
        </span>
        <span className='block'>
          2. 서비스 제공 및 운영: 마이페이지 활동 기록 관리, 온·오프라인 세션
          출석 확인, 서비스 품질 개선 및 통계 분석
        </span>
        <span className='block'>
          3. 외부 서비스 연동: Mait(CS 퀴즈) 서비스 이용을 위한 자동 계정 생성
          및 로그인 연동
        </span>
      </div>
    ),
  },
  {
    title: '제2조 처리하는 개인정보의 항목',
    content: (
      <div className='text-body-l pl-3'>
        동아리는 다음과 같은 개인정보 항목을 처리합니다. <br />
        <span className='mt-2 block'>
          1. 회원가입 시 수집하는 항목(필수): 이름, 아이디(이메일), 비밀번호,
          전화번호, 학교명, 학번, 기수, 성별
        </span>
        <span className='block'>
          2. 서비스 이용 과정에서 자동으로 생성·수집되는 항목: 이메일 인증코드,
          서비스 방문 기록, 접속 로그, 접속 IP 정보, 브라우저 정보
        </span>
        <span className='block'>3. 실시간 GPS 위치 정보(출석 확인용)</span>
      </div>
    ),
  },
  {
    title: '제3조 개인정보의 처리 및 보유 기간',
    content: (
      <div className='text-body-l pl-3'>
        1. 동아리는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
        개인정보를 수집할 때 동의받은 보유·이용기간 내에서 개인정보를
        처리·보유합니다. <br />
        2. 구체적인 보유 기간은 다음과 같습니다. <br />
        <span className='block pl-[15px]'>
          - 회원가입 및 동아리 활동 관리: 동아리 활동 종료 또는 회원 탈퇴 시까지
          보유·이용 후 지체 없이 파기
        </span>
        <span className='block pl-[15px]'>
          - 서비스 이용 기록, 접속 로그 등: 서비스 안정성 확보 및 이용 통계
          분석을 위하여 수집일로부터 1년간 보관 후 파기
        </span>
        <span className='block pl-[15px]'>
          - 실시간 GPS 위치 정보: 출석 확인 목적 달성 후 즉시 파기하며 별도로
          저장하지 않습니다.
        </span>
      </div>
    ),
  },
  {
    title: '제4조 개인정보의 제3자 제공',
    content: (
      <div className='text-body-l pl-3'>
        1. 동아리는 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지
        않습니다. <br />
        2. 다만, 다음 각 호의 경우에는 정보주체의 동의를 얻어 개인정보를
        제3자에게 제공할 수 있습니다. <br />
        <span className='block pl-[15px]'>- 제공받는 자: Mait</span>
        <span className='block pl-[15px]'>
          - 제공 목적: Mait 계정 자동 생성 및 로그인 연동, 퀴즈 서비스 제공
        </span>
        <span className='block pl-[15px]'>
          - 제공 항목: 이메일(아이디), 비밀번호(또는 로그인에 필요한 인증정보)
        </span>
        <span className='block pl-[15px]'>
          - 보유·이용 기간: 코테이토 회원 탈퇴 시 또는 Mait 서비스 종료 시까지
        </span>
        3. 정보주체는 개인정보 제3자 제공에 대한 동의를 거부할 권리가 있으며,
        동의 거부 시 Mait 연동 CS 퀴즈 서비스 이용이 제한될 수 있습니다.
      </div>
    ),
  },
  {
    title: '제5조 개인정보의 처리 위탁',
    content: (
      <p className='text-body-l pl-3'>
        현재 코테이토는 개인정보 처리 업무를 외부 업체에 위탁하지 않습니다. 향후
        위탁이 발생하는 경우, 위탁받는 자와 위탁 업무 내용, 위탁 기간 등을 본
        처리방침을 통하여 공개하고, <br />
        「개인정보 보호법」 제26조에 따른 계약 체결 및 관리·감독을 수행합니다.
      </p>
    ),
  },
  {
    title: '제6조 정보주체의 권리·의무 및 행사방법',
    content: (
      <div className='text-body-l pl-3'>
        1. 정보주체(회원)는 동아리에 대해 언제든지 다음 각 호의 개인정보 보호
        관련 권리를 행사할 수 있습니다. <br />
        <span className='block pl-[15px]'>
          a. 개인정보 열람 요구 <br />
          b. 개인정보 정정·삭제 요구 <br />
          c. 개인정보 처리정지 요구
        </span>
        2. 위 권리는 서비스 내 기능 또는 동아리에서 안내한
        이메일(itcotato@gmail.com)을 통하여 행사할 수 있습니다. 동아리는
        「개인정보 보호법」 및 관련 법령에 따라 지체 없이 조치합니다. <br />
        3. 정보주체는 법정대리인이나 위임을 받은 자 등 대리인을 통하여 권리를
        행사할 수 있으며, 이 경우 관련 법령에서 정한 위임장 서식을 제출하여야 할
        수 있습니다. <br />
        4. 동아리는 열람·정정·삭제·처리정지 요구 시, 요구를 한 자가 본인 또는
        정당한 대리인인지 확인합니다.
      </div>
    ),
  },
  {
    title: '제7조 개인정보의 파기 절차 및 방법',
    content: (
      <div className='text-body-l pl-3'>
        1. 동아리는 개인정보 보유기간 경과, 처리 목적 달성 등 개인정보가
        불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. <br />
        2. 파기 절차: 파기 사유가 발생한 개인정보를 선정하고, 개인정보
        보호책임자의 승인을 받아 파기합니다. <br />
        3. 파기 방법 <br />
        <span className='block pl-[15px]'>
          - 전자적 파일: 복구·재생이 불가능한 기술적 방법을 사용하여 삭제
        </span>
        <span className='block pl-[15px]'>- 종이 문서: 파쇄 또는 소각</span>
      </div>
    ),
  },
  {
    title: '제8조 개인위치정보의 처리',
    content: (
      <div className='text-body-l pl-3'>
        1. 동아리는 오프라인 활동에서 출석 확인을 위하여 회원의
        개인위치정보(실시간 GPS 위치)를 수집·이용할 수 있습니다. <br />
        2. 개인위치정보는 출석 확인 목적 외 다른 용도로 이용되지 않으며, 목적
        달성 후 즉시 파기됩니다. <br />
        3. 회원은 개인위치정보의 수집·이용 동의를 철회할 수 있으며, 동의 철회 시
        위치 기반 출석 서비스 이용이 제한될 수 있습니다.
      </div>
    ),
  },
  {
    title: '제9조 개인정보의 안전성 확보조치',
    content: (
      <div className='text-body-l pl-3'>
        동아리는 개인정보의 안전성 확보를 위하여 다음과 같은 조치를 시행합니다.{' '}
        <br />
        1. 관리적 조치: 개인정보 취급자의 최소화, 정기적인 교육, 내부 관리계획
        수립 및 시행 <br />
        2. 기술적 조치: 비밀번호 암호화, 접근권한 관리, 보안 프로그램 설치 및
        주기적인 점검 <br />
        3. 물리적 조치: 개인정보가 저장된 시스템에 대한 물리적 접근 통제
      </div>
    ),
  },
  {
    title: '제10조 개인정보 보호책임자',
    content: (
      <div className='text-body-l pl-3'>
        1. 동아리는 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보 관련
        문의 및 불만 처리 등을 위하여 개인정보 보호책임자를 지정하고 있습니다.{' '}
        <br />
        <span className='block pl-[15px]'>
          - 개인정보 보호책임자: 임준서 (코테이토 회장)
        </span>
        <span className='block pl-[15px]'>
          - 연락처: 이메일 itcotato@gmail.com, 코테이토 카카오톡 채널
        </span>
        2. 정보주체는 코테이토의 서비스를 이용하면서 발생한 모든 개인정보 보호
        관련 문의를 개인정보 보호책임자에게 문의할 수 있으며, 동아리는 이에 대해
        지체 없이 답변 및 처리합니다.
      </div>
    ),
  },
  {
    title: '제11조 권익침해에 대한 구제 방법',
    content: (
      <div className='text-body-l pl-3'>
        정보주체는 개인정보침해로 인한 구제를 받기 위하여 아래 기관에 분쟁
        해결이나 상담을 신청할 수 있습니다. <br />
        <span className='block pl-[15px]'>
          - 개인정보분쟁조정위원회: 1833-6972 (www.kopico.go.kr)
        </span>
        <span className='block pl-[15px]'>
          - 개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)
        </span>
        <span className='block pl-[15px]'>
          - 대검찰청 사이버수사과: (국번없이) 1301 (www.spo.go.kr)
        </span>
        <span className='block pl-[15px]'>
          - 경찰청 사이버수사국: (국번없이) 182 (ecrm.cyber.go.kr)
        </span>
      </div>
    ),
  },
  {
    title: '제12조 개인정보 처리방침의 변경',
    content: (
      <div className='text-body-l pl-3'>
        1. 이 개인정보 처리방침은 법령, 지침 또는 동아리 정책 변경에 따라 개정될
        수 있습니다. <br />
        2. 동아리가 개인정보 처리방침을 변경하는 경우, 변경 내용 및 시행일자를
        명시하여 시행 7일 전부터 카카오톡 오픈채팅방 등을 통하여 공지합니다.
        <br />
        <span className='block pl-[15px]'>
          다만, 수집하는 개인정보 항목의 변경 등 중요한 내용의 변경인 경우에는
          최소 30일 전에 공지합니다.
        </span>
      </div>
    ),
  },
];
