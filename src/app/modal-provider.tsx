'use client';

import NiceModal from '@ebay/nice-modal-react';
import React from 'react';

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return <NiceModal.Provider>{children}</NiceModal.Provider>;
};

export default ModalProvider;
