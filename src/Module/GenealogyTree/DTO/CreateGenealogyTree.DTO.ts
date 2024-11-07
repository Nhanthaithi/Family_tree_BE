export interface CreateGenealogyTree {
  nameGenealogyTree?: string;
  nameBranch?: string;
  address?: string;
  id_use?: number;
}

//========================================> type post thông số node egde
export interface GenealogyTreePayload {
  userId: number;
  nodes: [
    {
      id_node: number;
      name_node: string;
      day_node: string;
      nameWife_node: string;
      positionX: number;
      positionY: number;
    },
  ];
  edges: [
    {
      id_edge: number;
      source_edge: number;
      target_edge: number;
    },
  ];
}
