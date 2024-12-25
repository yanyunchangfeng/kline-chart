import React, { FC } from 'react';
import { GlobalStyle, WrapContainer } from 'src/index.style';
import { KChart } from 'src/components';

const App: FC = () => {
  return (
    <>
      <GlobalStyle />
      <WrapContainer>
        <KChart />
      </WrapContainer>
    </>
  );
};

export default App;
