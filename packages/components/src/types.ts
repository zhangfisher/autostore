export type ReactFC<Props=unknown> = React.FC<React.PropsWithChildren<
    Pick<React.HTMLAttributes<HTMLElement>,'className' | 'style'> & Props>>  


    
export type Dict<T=any> = Record<string,T>