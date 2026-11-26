import Script from 'next/script';

export const BeUsableRum = () => {
  // 로컬 사진 미리보기를 실제 서비스 분석에 전송하지 않는다.
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_HOMEPAGE_IMAGE_PREVIEW === 'true'
  )
    return null;
  return (
    <>
      <Script
        id='beusable-rum'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
              (function(w, d, a){
                  w.__beusablerumclient__ = {
                      load : function(src){
                          var b = d.createElement("script");
                          b.src = src; b.async=true; b.type = "text/javascript";
                          d.getElementsByTagName("head")[0].appendChild(b);
                      }
                  };w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
              })(window, document, "//rum.beusable.net/load/b260216e212709u009");
            `,
        }}
      />
    </>
  );
};
