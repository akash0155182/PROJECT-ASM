import api from './index';

export const getComponentsByAssetId = async (assetId) => {
  try {
    const response = await api.get(`/COMPONTSERVICE/components/asset/${assetId}/components`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addComponent = async (componentData) => {
  try {
    await api.post('/COMPONENTSERVICE/components', componentData);
  } catch (error) {
    throw error;
  }
};

export const getAllComponents = async () => {
  try {
    const response = await api.get('/COMPONENTSERVICE/components/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};


