import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </main>
  );
};

export default PageContainer;