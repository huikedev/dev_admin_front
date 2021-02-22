import { useCallback, useState } from 'react';
import { PaginatedParams } from 'ahooks/es/useAntdTable';
import { AppPaginator } from '@/common/AppTypes';
import { getModuleList, setRefreshException, setRefreshRoutes } from '@/services/logic';
import { AppPaginatorInit } from '@/common/AppInitState';

export interface ModuleListData extends API.ModuleWithExtend {
  controller_count: number;
}

export default function useModuleModel() {
  const [btnLock, setBtnLock] = useState(false);
  const [result, setResult] = useState(false);
  const fetchModuleList = useCallback(({ current, pageSize }: PaginatedParams[0]): Promise<
    AppPaginator<ModuleListData>
  > => {
    return getModuleList({ current, pageSize }).then((res) => {
      if (res.success) {
        return res.data;
      }
      return AppPaginatorInit;
    });
  }, []);

  // 刷新路由配置文件
  const refreshRoutes = useCallback(async (id: number) => {
    setBtnLock(true);
    setResult(false);
    setRefreshRoutes({ id })
      .then((res) => {
        setBtnLock(false);
        if (res.success) {
          setResult(true);
        }
      })
      .catch(() => {
        setBtnLock(false);
      });
  }, []);

  // 刷新异常配置文件
  const refreshException = useCallback(async (id: number) => {
    setBtnLock(true);
    setResult(false);
    setRefreshException({ id })
      .then((res) => {
        setBtnLock(false);
        if (res.success) {
          setResult(true);
        }
      })
      .catch(() => {
        setBtnLock(false);
      });
  }, []);

  return {
    btnLock,
    result,
    fetchModuleList,
    refreshRoutes,
    refreshException,
  };
}
