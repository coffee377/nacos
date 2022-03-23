/*
 * Copyright 1999-2018 Alibaba Group Holding Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { isJsonString } from '../utils/nacosutil';

// 配置管理
const configurationMenu = {
  key: 'configurationManagementVirtual',
  children: [
    {
      key: 'configurationManagement', // 配置列表
      url: '/configurationManagement',
    },
    {
      key: 'historyRollback', // 历史版本
      url: '/historyRollback',
    },
    {
      key: 'listeningToQuery', // 监听查询
      url: '/listeningToQuery',
    },
  ],
};
/**
 * 权限控制相关
 */
const authorityControlMenu = {
  key: 'authorityControl',
  children: [
    {
      key: 'userList', // 用户列表
      url: '/userManagement',
    },
    {
      key: 'roleManagement', // 角色管理
      url: '/rolesManagement',
    },
    {
      key: 'privilegeManagement', // 权限管理
      url: '/permissionsManagement',
    },
  ],
};

export function getMenuData(model) {
  const { token = '{}' } = localStorage;
  const { globalAdmin } = isJsonString(token) ? JSON.parse(token) || {} : {};

  return [
    model === 'naming' ? undefined : configurationMenu,
    {
      key: 'serviceManagementVirtual',
      children: [
        {
          key: 'serviceManagement',
          url: '/serviceManagement',
        },
        {
          key: 'subscriberList',
          url: '/subscriberList',
        },
      ],
    },
    globalAdmin ? authorityControlMenu : undefined,
    {
      key: 'namespace',
      url: '/namespace',
    },
    {
      key: 'clusterManagementVirtual',
      children: [
        {
          key: 'clusterManagement',
          url: '/clusterManagement',
        },
      ],
    },
  ].filter(item => item);
}

export default getMenuData;

export function getMenus(model) {
  return [
    {
      key: '应用运行监控',
      children: [
        { key: '节点运行监控', url: '/clusterManagement' },
        { key: '服务运行监控', url: '/serviceManagement' },
      ],
    },
    {
      key: '服务注册管理',
      url: '/configurationManagement',
    },
    {
      key: '服务发布管理',
      url: '/historyRollback',
    },
    {
      key: '服务治理',
      url: '/subscriberList',
    },
    {
      key: '服务信息查询',
      url: '/serviceManagement',
    },
    {
      key: '服务运行监控',
      url: '/listeningToQuery',
    },
    ...getMenuData(model).filter(
      m =>
        m &&
        ![
          'configurationManagementVirtual',
          'serviceManagementVirtual',
          'clusterManagementVirtual',
        ].includes(m.key)
    ),
  ];
}
