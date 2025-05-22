export interface News {
  id: string;
  title: string;
  content: string;
  createdAt: string;  // ISO string para evitar errores Date<string>
  imageUrl?: string | null;
}
