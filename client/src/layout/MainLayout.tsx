import { FC } from 'react'
import { Header } from '../components/Header'

export interface MainLayoutProps {
    children: React.ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className=' w-4/5 mx-auto flex gap-4'>
            <Header />
            <div className='flex-1'>
                {children}
            </div>
        </div>
    );
};

