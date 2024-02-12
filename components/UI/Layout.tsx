import React,{ReactElement} from 'react';
import Head from 'next/head';

interface ILayoutProps {
    title?: string,
    transparent?:boolean,
    children?: JSX.Element | JSX.Element[];
}

const Layout: React.FunctionComponent<ILayoutProps> = (props): ReactElement =>  {
    return (

        <div>
          <Head>
            <title>{props.title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <main>
            {props.children}
          </main>
        </div>
      )
};

export default Layout;
