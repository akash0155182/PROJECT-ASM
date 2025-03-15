import api from './index';

export const getAllAssets = async () => {
  try {
    const response = await api.get('/ASSETSERVICE/assets/all');
    return response.data.reverse();
  } catch (error) {
    throw error;
  }
};

export const loadAssets = async (page, pageSize) => {
  try{
  const response = await api.get(`/ASSETSERVICE/assets/list?page=${page}&size=${pageSize}`);
  return response.data;
  }catch (error){
    throw error;
  }
};

export const addAsset = async (assetData) => {
  try {
    await api.post('/ASSETSERVICE/assets', assetData);
  } catch (error) {
    throw error;
  }
};

export const getAssetById = async (id) => {
  try {
    const response = await api.get(`/ASSETSERVICE/assets?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignComponentToAsset = async (assetId, componentId) => {
    try {
      const response = await api.post(`/RELATIONSHIPSERVICE/relations/link?assetId=${assetId}&componentId=${componentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

