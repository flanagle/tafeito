import React, {useEffect} from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {useAxios} from '../../hooks/useAxios';

import {Anexo} from '../../common/types';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

type AttachFileProps = {
  anexo: Anexo;
  taskId: number;
}

type ResponseGetAttachedFile = Blob;
type ResponseRemoveAttach = void;

const AttachFile = (props:AttachFileProps) => {
  const { taskId, anexo } = props;

  const {
    commit: commitDownloadAnexo,
    response,
    loading
  } = useAxios<ResponseGetAttachedFile>({
    method: 'GET',
    path: `tarefas/${taskId}/anexos/${anexo.id}`
  });

  const {
    commit: commitRemoveAttach,
  } = useAxios<ResponseRemoveAttach>({
    method: 'DELETE',
    path: `tarefas/${taskId}/anexos/${anexo.id}`
  });

  useEffect(() => {
    if(response && !loading) {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', anexo.nome);
      document.body.appendChild(link);
      link.click();
    }
  }, [response, loading]);

  const downloadAnexo = () => {
    commitDownloadAnexo(
      undefined, 
      undefined,
      undefined,
      'blob'
    );
  };

  function reloadWindow()  {
    window.location.reload()
  }

  const removerAnexo = () => {
    commitRemoveAttach({}, reloadWindow);
  };


  return (
      <Stack direction='row' spacing={1}>
        <ListItemButton sx={{ pl: 4 }} onClick={() => {downloadAnexo()}}>
          <ListItemText primary={anexo.nome} />
          <Tooltip title={`Excluir Anexo`}>
            <IconButton edge="end" aria-label="Excluir Anexo" onClick={(e) => {
              e.stopPropagation();
              removerAnexo();}
            }>
              <Delete />
            </IconButton>
          </Tooltip>
        </ListItemButton>
      </Stack>
  )
}

export default AttachFile;