import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux';
import { initStore } from '../src/redux/store';

import HandleError from '../src/components/error/container/handle-error';

class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <HandleError>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </HandleError>
            </Container>
        );
    }
}

export default initStore(MyApp, null, null, 'HOME')