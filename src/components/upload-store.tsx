import { createContext, useContext, useState, type ReactNode } from 'react';

export type CropState = { scale: number; x: number; y: number; rotation: number };
export type PlateMask = { mode: 'blur' | 'logo'; x: number; y: number; w: number; h: number } | null;

/** plate: undefined = 아직 안 건드림(기본 박스), null = 번호판 없음 */
export type UploadPhoto = { id: string; uri: string; crop: CropState; plate?: PlateMask };

export const INITIAL_CROP: CropState = { scale: 1, x: 0, y: 0, rotation: 0 };

type Store = {
  photos: UploadPhoto[];
  setPhotos: (p: UploadPhoto[]) => void;
  update: (id: string, patch: Partial<UploadPhoto>) => void;
};

const Ctx = createContext<Store | null>(null);

// 업로드 플로우(pick → crop → plate → …) 동안 선택한 사진과 편집 상태를 보관
export function UploadProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<UploadPhoto[]>([]);
  const update = (id: string, patch: Partial<UploadPhoto>) =>
    setPhotos((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  return <Ctx.Provider value={{ photos, setPhotos, update }}>{children}</Ctx.Provider>;
}

export function useUpload() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useUpload must be used inside UploadProvider');
  return v;
}
