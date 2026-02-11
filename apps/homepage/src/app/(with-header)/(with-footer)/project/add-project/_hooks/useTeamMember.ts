import {useState} from 'react';
import {Position} from '@/schemas/project/project.schema';
import {TeamState} from '@/schemas/project/project-type';

export const useTeamMembers = (initialState: TeamState) => {
  const [teamMembers, setTeamMembers] = useState<TeamState>(initialState);

  const addMember = (role: Position) => {
    if (teamMembers[role].length >= 5) return;
    setTeamMembers((prev) => ({
      ...prev,
      [role]: [...prev[role], '감직이'],
    }));
  };

  const removeMember = (role: Position, index: number) => {
    setTeamMembers((prev) => ({
      ...prev,
      [role]: prev[role].filter((_, i) => i !== index),
    }));
  };

  const updateMemberName = (role: Position, index: number, newName: string) => {
    setTeamMembers((prev) => {
      const updatedRole = [...prev[role]];
      updatedRole[index] = newName;
      return {...prev, [role]: updatedRole};
    });
  };

  return {teamMembers, addMember, removeMember, updateMemberName};
};
