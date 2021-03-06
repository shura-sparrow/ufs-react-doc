import * as React from 'react';

import Example from '../Example/';

export interface Props {
    className: string;
    srcPath: string;
}

export interface State {
    examples: {
        component: JSX.Element[];
        source: string;
    }[]
}

export default class Examples extends React.Component<Props, {}> {

    state = {
        examples: []
    }

    componentDidMount(): void {
        this.loadExamples();
    }

    componentDidUpdate(prevProps: Props): void {
        if (prevProps.srcPath !== this.props.srcPath) {
            this.loadExamples();
        }
    }

    private loadExamples() {
        /**
         * Load examples on client since
         * styles may be bundled with style-loader
         */
        if (typeof window !== "undefined") {
            const allExamples = require('examples-loader!./index.js');
            const { srcPath, className } = this.props;
            const key = [ srcPath, className ].join(':');
            const examples = allExamples[key] || [];
            this.setState({ examples });
        }
    }

    render() {
        if (this.state.examples.length === 0) {
            return null;
        }

        return (
            <div>
                <h4>Examples:</h4>
                {this.state.examples.map((example, i) =>
                    <Example
                        key={i}
                        source={example.source}
                        component={example.component} />
                )}
            </div>
        )
    }
}
