// Função para salvar os dados do bloco
const handleSave = async (data: any) => {
  if (!selectedPage) {
    setErrorMessage('Por favor, selecione uma página antes de salvar.');
    setTimeout(() => setErrorMessage(null), 5000);
    return;
  }

  try {
    const baseUrl = getTenantUrl();
    const tenantId = localStorage.getItem(tenantIdStorageKey);

    // Os dados já vêm formatados corretamente do BlockManagerDragDrop
    // Apenas precisamos garantir que o pageId, blockType e template estejam corretos
    const saveData = {
      ...data,
      pageId: selectedPage,
      blockType: 'articles',
      template: blockType
    };

    // Se já existe um ID de bloco, incluir na requisição para atualizar em vez de criar
    if (blockData && blockData.id) {
      saveData.id = blockData.id;
    }

    const endpoint = blockData && blockData.id 
      ? `${baseUrl}/private/page-blocks/v2/update/${blockData.id}`
      : `${baseUrl}/private/page-blocks/v2/create`;
    
    const method = blockData && blockData.id ? 'put' : 'post';

    console.log('Dados a serem salvos:', saveData);
    
    const response = await api({
      method,
      url: endpoint,
      data: saveData,
      headers: {
        auth: deliveryUserToken,
        'x-tenant-id': tenantId
      }
    });

    const result = response.data;
    console.log('Bloco salvo com sucesso:', result);

    // Atualizar o estado local com os dados salvos
    setBlockData(result);

    // Exibir notificação de sucesso
    setSuccessMessage('Bloco salvo com sucesso!');
    setTimeout(() => setSuccessMessage(null), 3000);
  } catch (error: any) {
    console.error('Erro ao salvar o bloco:', error);
    setErrorMessage(error.message || 'Erro ao salvar o bloco. Por favor, tente novamente.');
    setTimeout(() => setErrorMessage(null), 5000);
  }
}; 