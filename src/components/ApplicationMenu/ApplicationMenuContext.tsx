import React, { createContext, useContext } from 'react';

/**
 * ApplicationMenu Context
 * 
 * 用于在 ApplicationMenu 和其子组件（如 AvatarButtonMenu）之间共享状态
 */
interface ApplicationMenuContextValue {
  /** 菜单是否展开 */
  expanded: boolean;
}

const ApplicationMenuContext = createContext<ApplicationMenuContextValue | null>(null);

/**
 * ApplicationMenu Context Provider
 */
export const ApplicationMenuProvider: React.FC<{
  expanded: boolean;
  children: React.ReactNode;
}> = ({ expanded, children }) => {
  return (
    <ApplicationMenuContext.Provider value={{ expanded }}>
      {children}
    </ApplicationMenuContext.Provider>
  );
};

/**
 * Hook to access ApplicationMenu context
 * 
 * @returns ApplicationMenu context value or null if not inside ApplicationMenu
 */
export function useApplicationMenuContext(): ApplicationMenuContextValue | null {
  return useContext(ApplicationMenuContext);
}
