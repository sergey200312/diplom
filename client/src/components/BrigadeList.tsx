import { FC } from 'react';
import { ChevronDown } from 'lucide-react';
import { IBrigade } from '../types/brigade';
import { BrigadeItem } from './BrigadeItem';

interface BrigadeListProps {
    brigades?: IBrigade[];
    isLoading: boolean;
    expandedTeams: Record<number, boolean>;
    toggleTeamExpansion: (teamId: number) => void;
}

export const BrigadeList: FC<BrigadeListProps> = ({ 
    brigades, 
    isLoading,
    expandedTeams,
    toggleTeamExpansion 
}) => {
    if (isLoading) return <div>Загрузка...</div>;
    if (!brigades?.length) return <div>Нет доступных бригад</div>;

    return (
        <div className="space-y-4">
            {brigades.map((team) => (
                <BrigadeItem
                    key={team.id}
                    team={team}
                    expandedTeams={expandedTeams}
                    toggleTeamExpansion={toggleTeamExpansion} />
            ))}
        </div>
    );
};