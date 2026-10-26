import { apiClient } from './apiClient';
import { Pet } from '../types';
import { MOCK_PETS } from '../data/mockData';

export const petService = {
  async getPets(): Promise<Pet[]> {
    return apiClient.get<Pet[]>('/pets', MOCK_PETS);
  },

  async getPetById(id: string): Promise<Pet | undefined> {
    const fallback = MOCK_PETS.find(p => p.id === id);
    return apiClient.get<Pet>(`/pets/${id}`, fallback);
  },

  async createPet(pet: Pet): Promise<Pet> {
    return apiClient.post<Pet>('/pets', pet, pet);
  }
};
