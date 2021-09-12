import {createGlobalStyle} from 'styled-components';
import {normalize} from 'styled-normalize';

// global styles
const globalStyles = createGlobalStyle`
    ${normalize}

    html,body {
        overflow:hidden;
    }
    * box-sizing: border-box;
`;
export default globalStyles;
