
import React, { useState } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import TreeNode from './TreeNode';

const DynamicTreeTable = ({ data }) => {
  const [expandedKeys, setExpandedKeys] = useState({});

  const onToggle = (e) => {
    const expandedKeysCopy = { ...expandedKeys };
    expandedKeysCopy[e.node.key] = e.node.expanded;
    setExpandedKeys(expandedKeysCopy);
  };

  const renderTreeTable = (data) => {
    return data.map((node) => {
      return (
        <TreeNode
          key={node._id.$oid}
          node={node}
          expandedKeys={expandedKeys}
          onToggle={onToggle}
        />
      );
    });
  };

  return (
    <TreeTable
      value={data}
      expandedKeys={expandedKeys}
      onToggle={onToggle}
      paginator
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      rows={10}
      rowsPerPageOptions={[5, 10, 20]}
    >
      <Column field="label" header="Label" expander></Column>
      <Column field="url" header="URL"></Column>
    </TreeTable>
  );
};

export default DynamicTreeTable