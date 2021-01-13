import { Global } from "@emotion/react"

export const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'MetaProCond';
        src: url('/fonts/MetaPro/MetaOffcPro-CondBlack.ttf');
        font-style: normal;
        font-weight: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'MetaProSerif';
        src: url('/fonts/MetaPro/MetaSerifOffcPro-Book.ttf');
        font-style: normal;
        font-weight: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'MetaProSerifBold';
        src: url('/fonts/MetaPro/MetaSerifOffcPro-Bold.ttf');
        font-style: normal;
        font-weight: normal;
        font-display: swap;
      }
    `}
  />
)