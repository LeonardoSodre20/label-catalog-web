import { create } from 'zustand'

interface CreateLabelState {
  step: number
  selectedType: string | null
  imageFile: File | null
  imagePreview: string | null
  setStep: (step: number) => void
  setSelectedType: (type: string) => void
  setImageFile: (file: File | null) => void
  reset: () => void
}

export const useCreateLabelStore = create<CreateLabelState>((set) => ({
  step: 1,
  selectedType: null,
  imageFile: null,
  imagePreview: null,
  setStep: (step) => set({ step }),
  setSelectedType: (type) => set({ selectedType: type }),
  setImageFile: (file) =>
    set({
      imageFile: file,
      imagePreview: file ? URL.createObjectURL(file) : null,
    }),
  reset: () =>
    set({
      step: 1,
      selectedType: null,
      imageFile: null,
      imagePreview: null,
    }),
}))
