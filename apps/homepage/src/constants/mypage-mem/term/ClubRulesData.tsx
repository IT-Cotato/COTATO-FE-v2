import {TermsSection} from '@/constants/mypage-mem/term/terms';

export const CLUB_RULES: TermsSection[] = [
  {
    title: '제1조 <정식 명칭>',
    content: (
      <div className='text-body-l flex flex-col gap-1 px-3'>
        {[
          {
            n: '1.',
            d: '본 동아리를 IT 연합 동아리 ‘코테이토(COTATO)’라 칭한다.',
          },
          {
            n: '2.',
            d: '코테이토 13기는 2026년 03월 06일부터 2026년 08월 21일까지 활동하는 기수를 칭한다.',
          },
        ].map((item) => (
          <div key={item.n} className='flex items-start'>
            <span className='shrink-0 pr-1'>{item.n}</span>
            <span>{item.d}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: '제2조 <창립 목적>',
    content: (
      <div className='text-body-l flex flex-col gap-1 px-3'>
        {[
          {
            n: '1.',
            d: '코테이토는 스터디/프로젝트를 포함한 각종 IT 관련 활동들을 통해 회원에게 지식 습득 및 친목 활동의 기회를 제공한다.',
          },
          {n: '2.', d: '모든 활동은 회원 성장 도모의 목적으로 한다.'},
        ].map((item) => (
          <div key={item.n} className='flex items-start'>
            <span className='shrink-0 pr-1'>{item.n}</span>
            <span>{item.d}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: '제3조 <운영진>',
    content: (
      <div className='text-body-l flex flex-col gap-1 pl-3'>
        {[
          {
            n: '1.',
            d: '본 동아리에서 운영진은 회장, 부회장, 교육팀, 기획&운영팀, 홍보팀을 칭한다.',
            list: [
              {
                label: '[코테이토 13기 운영진]',
                items: [
                  '- 회장: 임준서 / 부회장: 김세현',
                  '- 교육팀장: 박현정, 강철웅, 신수진',
                  '- 기획 & 운영팀장: 고민성 / 홍보팀: 이아선',
                ],
              },
            ],
          },
          {
            n: '2.',
            d: '코테이토 8기부터 각 포지션 별 파트장을 임명한다.',
            list: [
              {
                label: '[코테이토 13기 파트장]',
                items: [
                  '- 백엔드 파트장: 임준서, 김기민',
                  '- 프론트엔드 파트장: 김법균',
                  '- 기획 파트장: 장수빈',
                  '- 디자인 파트장: 고민성',
                ],
              },
            ],
          },
        ].map((item) => (
          <div key={item.n} className='flex flex-col gap-1'>
            <div className='flex items-start'>
              <span className='shrink-0 pr-1'>{item.n}</span>
              <span>{item.d}</span>
            </div>
            {item.list && (
              <div className='flex flex-col pl-4 lg:pl-5'>
                {item.list.map((group, idx) => (
                  <div key={idx} className='flex flex-col'>
                    <span className='text-body-l-sb'>{group.label}</span>
                    <div className='flex flex-col pl-2'>
                      {group.items.map((li, liIdx) => (
                        <span key={liIdx}>{li}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: '제4조 <회원>',
    content: (
      <div className='text-body-l flex flex-col gap-1 pl-3'>
        {[
          {
            n: '1.',
            d: '본 동아리의 정식 모집 절차를 통해 선발되어 회비를 납부한 자를 회원이라 칭한다.',
          },
          {
            n: '2.',
            d: '코테이토는 학기를 기준으로 신입 회원을 선발하며, 3,4년제 학교의 경우 4학기 이상 수료, 2년제 학교의 경우 3학기 이상 수료해야 지원할 수 있다.',
          },
          {
            n: '3.',
            d: '회원은 회칙을 준수하여 성실하게 코테이토 활동에 임해야 하며, 활동 기간 내에 퇴출 당한 자는 회원 자격을 박탈한다.',
          },
          {
            n: '4.',
            d: '운영진 및 파트장을 제외한 나머지 회원은 반드시 하나 이상의 스터디/프로젝트 팀에 참여해야 한다.',
          },
          {
            n: '5.',
            d: '신입 부원은 반드시 하나 이상의 프로젝트에 참여해야 한다.',
          },
          {
            n: '6.',
            d: '해당 기수 활동을 끝까지 마무리하였을 때, 회원 중 벌점 14점 이하에 해당하는 자는 OM으로 분류된다.',
          },
          {
            n: '7.',
            d: 'OM은 코테이토 이후 기수 활동에 신청할 수 있으며, 수락 여부는 운영진의 심사를 통해 결정한다.',
          },
        ].map((item) => (
          <div key={item.n} className='flex items-start'>
            <span className='shrink-0 pr-1'>{item.n}</span>
            <span>{item.d}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: '제5조 <정규 세션>',
    content: (
      <div className='text-body-l flex flex-col gap-1 pl-3'>
        {[
          {
            n: '1.',
            d: '코테이토 13기는 매주 금요일 19시에 정규 세션을 가진다. 일시는 운영진의 판단에 따라 변경될 수 있다.',
          },
          {
            n: '2.',
            d: '코테이토는 팀별로 스터디와 프로젝트를 진행하며, 모든 진행 상황은 매주 카페에 업로드 하고 일부 세션에서 발표한다.',
          },
          {
            n: '3.',
            d: '정규 세션은 운영진의 결정에 따라 대면 또는 비대면 형식으로 진행될 수 있다.',
          },
          {
            n: '4.',
            d: '정규 세션에 참석하지 못하는 회원은 탈퇴 조치될 수 있다.',
          },
        ].map((item) => (
          <div key={item.n} className='flex items-start'>
            <span className='shrink-0 pr-1'>{item.n}</span>
            <span>{item.d}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: '제6조 <회비>',
    content: (
      <div className='text-body-l flex flex-col gap-1 pl-3'>
        {[
          {n: '1.', d: '코테이토 13기의 회비는 50,000원으로 정한다.'},
          {
            n: '2.',
            d: '코테이토의 회비는 정규 세션 준비 및 진행에 필요한 비용을 우선으로 하여 사용한다.',
          },
          {
            n: '3.',
            d: '부회장은 회비를 관리하며, 회비 사용 내역은 모든 회원에게 투명하게 공개해야 한다.',
          },
        ].map((item) => (
          <div key={item.n} className='flex items-start'>
            <span className='shrink-0 pr-1'>{item.n}</span>
            <span>{item.d}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: '제7조 <벌점>',
    content: (
      <div className='text-body-l flex flex-col gap-2 pl-3'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-start'>
            <span className='shrink-0 pr-1'>1.</span>
            <span>모든 정규 일정에 관하여 다음과 같은 조항이 적용된다.</span>
          </div>
          <div className='flex flex-col gap-0.5 pl-4 lg:pl-5'>
            {[
              {
                n: 'a.',
                d: '결석 1회 시 벌점 7점, 지각 1회 시 벌점 4점이 부과된다.',
              },
              {
                n: 'b.',
                d: '불성실하게 참여할 시 운영진의 재량으로 벌점 3점을 부과할 수 있다.',
              },
              {n: 'c.', d: '벌점 15점 이상 누적 시 동아리에서 퇴출 조치한다.'},
            ].map((sub) => (
              <div key={sub.n} className='flex items-start'>
                <span className='shrink-0 pr-1'>{sub.n}</span>
                <span>{sub.d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex items-start'>
            <span className='shrink-0 pr-1'>2.</span>
            <span>정규 세션의 출석은 운영진이 공지한 시간으로 정한다.</span>
          </div>
          <div className='flex flex-col gap-0.5 pl-4 lg:pl-5'>
            {[
              {
                n: 'a.',
                d: '운영진이 공지한 시간보다 10분 이내로 늦을 경우 출석할 경우 지각으로 간주한다.',
              },
              {
                n: 'b.',
                d: '운영진이 공지한 시간보다 10분 이상 늦을 경우 결석으로 간주한다.',
              },
              {
                n: 'c.',
                d: '별도의 사전 고지 없이 세션에 참석하지 않은 경우 ‘완전 무단 결석’으로 간주하며, 결석 2회로 처리한다.',
              },
            ].map((sub) => (
              <div key={sub.n} className='flex items-start'>
                <span className='shrink-0 pr-1'>{sub.n}</span>
                <span>{sub.d}</span>
              </div>
            ))}
          </div>
        </div>
        {[
          {
            n: '3.',
            d: '운영진 및 파트장을 제외한 일반 회원 중 스터디/프로젝트 팀에 하나도 참여하지 않게 된 회원은 퇴출 조치한다.',
          },
          {
            n: '4.',
            d: '다음 항목은 경조사 및 코로나 등 불가피한 사유를 제외하고 반드시 참석해야 하며, 불참 시 퇴출 조치한다.',
            sub: 'a. OT / b. 해커톤',
          },
          {
            n: '5.',
            d: '스터디 또는 프로젝트를 중도 탈퇴한 회원에게는 벌점 7점을 부과한다. 단, 운영진이 해당 팀의 지속이 어렵다고 판단할 경우',
            sub: '내부 투표를 통해 팀의 존속 여부를 결정하며, 이 경우 벌점은 부과되지 않는다.',
          },
          {
            n: '6.',
            d: '주차별 진행 상황을 목요일 자정 이후에 업로드할 경우 해당 팀 전원에게 벌점 1점을 부과한다.',
          },
          {
            n: '7.',
            d: '파트별 네트워킹에 불성실하게 참여할 시, 파트장 재량으로 3점 이하의 벌점을 부과할 수 있다.',
          },
          {
            n: '8.',
            d: '모든 벌점 관리는 부회장이 진행하며, 벌점 관리 시트를 주기적으로 카페에 업로드 한다.',
          },
          {
            n: '9.',
            d: '벌점이 있는 경우, 비어 네트워크에 참여하여 벌점을 차감할 수 있다. 비어 네트워크 참여 1회당 벌점 2점 차감된다.',
          },
          {
            n: '10.',
            d: '모든 퇴출된 동아리원은 회비 환급이 불가하며 해당 기수 활동 인증서가 발급되지 않고 다음 기수 신청 자격이 박탈된다.',
          },
        ].map((item) => (
          <div key={item.n} className='flex flex-col gap-0.5'>
            <div className='flex items-start'>
              <span className='shrink-0 pr-1'>{item.n}</span>
              <span>{item.d}</span>
            </div>
            {item.sub && <div className='pl-6 lg:pl-5'>{item.sub}</div>}
          </div>
        ))}
      </div>
    ),
  },
];
