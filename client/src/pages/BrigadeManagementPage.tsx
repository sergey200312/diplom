import { useState } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { openCreateBrigadeModal } from '../store/features/modalSlice';
import { RootState } from '../store/createStore';
import CreateBrigadeModal from '../components/CreateBrigadeModal';
import { useGetAllBrigadesQuery } from '../store/api/brigadeApi';
import { Paginate } from '../components/Paginate';
import { BrigadeList } from '../components/BrigadeList';

const BrigadeManagementPage = () => {
    const [expandedTeams, setExpandedTeams] = useState<Record<number, boolean>>({});
    const [page, setPage] = useState(0);
    const [pageSize] = useState(1);
    
    const { data: response = { brigades: [], totalCount: 0 }, isLoading } = useGetAllBrigadesQuery({
        page: page + 1, 
        pageSize
    });

    const dispatch = useDispatch();
    const modalIsOpen = useSelector((state: RootState) => state.modal.isOpen);

    const toggleTeamExpansion = (teamId: number) => {
        setExpandedTeams(prev => ({
            ...prev,
            [teamId]: !prev[teamId]
        }));
    };

    return (
        <MainLayout>
            <div className=" min-h-screen p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                        <button
                            className="max-w-1/2 mb-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={() => dispatch(openCreateBrigadeModal())}
                        >
                            СОЗДАТЬ БРИГАДУ
                        </button>
                        
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">Список бригад</h2>
                            <input
                                type="text"
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Поиск бригад..."
                            />
                        </div>

                        <BrigadeList 
                            brigades={response.brigades} 
                            isLoading={isLoading}
                            expandedTeams={expandedTeams}
                            toggleTeamExpansion={toggleTeamExpansion}
                        />

                        <div className="flex justify-between items-center mt-6">
                            <span className="text-gray-600">
                                Найдено бригад: {response?.totalCount}
                            </span>
                            <Paginate 
                                page={page} 
                                pageSize={pageSize} 
                                response={response}  
                                setPage={setPage} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            {modalIsOpen && <CreateBrigadeModal />}
        </MainLayout>
    );
};

export default BrigadeManagementPage;