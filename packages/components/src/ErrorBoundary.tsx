

import React, { Component, ReactNode } from 'react';
import { Box } from './Box';

interface Props {
  children: ReactNode;
}

interface State {
  error: string | undefined;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(e: Error): State {
    return { error: e.stack };
  }
 

  render() {
    if (this.state.error) {
      return <Box>
        {this.state.error}
      </Box>;
    }

    return this.props.children;
  }
}
 