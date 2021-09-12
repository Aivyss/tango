import 'styled-components';
import {CSSProp, CSSObject} from 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        basicWidth: string;

        color: {
            primary: string;
            second: string;
            third: string;
            fourth: string;
        };
    }
}

declare module 'react' {
    interface Attributes {
        css?: CSSProp | CSSObject;
    }
}
