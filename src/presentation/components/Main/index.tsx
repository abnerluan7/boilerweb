import React from 'react';

import * as S from './styles';
import { MainProps } from './types';

const Main = ({ children }: MainProps) => {
  return <S.Container>{children}</S.Container>;
};

export default Main;
