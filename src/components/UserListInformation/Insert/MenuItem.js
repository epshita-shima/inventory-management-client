import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from './NodeService';
const MenuItem = () => {
    const [nodes, setNodes] = useState([]);
// const data=[
//     {
//       "label": "User Setting",
//       "url": "#",
//       "permissions": [],
//       "children": [
//         {
//           "label": "User Role",
//           "url": "#",
//           "permissions": [],
//           "children": []
//         },
//         {
//           "label": "User Profile",
//           "url": "#",
//           "permissions": [],
//           "children": []
//         },
//         {
//           "label": "User List",
//           "url": "/user-list-data",
//           "permissions": [],
//           "children": []
//         },
//         {
//           "label": "Create User",
//           "url": "#",
//           "permissions": [],
//           "children": []
//         }
//       ]
//     },
//     {
//       "label": "Departments",
//       "url": "#",
//       "permissions": [],
//       "children": [
//         {
//           "label": "Accounts Department",
//           "url": "#",
//           "permissions": [],
//           "children": [
//             {
//               "label": "Purchase Department",
//               "url": "#",
//               "permissions": [],
//               "children": []
//             },
//             {
//               "label": "Sales Department",
//               "url": "#",
//               "permissions": [],
//               "children": [
//                 {
//                   "label": "Purchase Department",
//                   "url": "#",
//                   "permissions": [],
//                   "children": []
//                 },
//                 {
//                   "label": "Sales Department",
//                   "url": "#",
//                   "permissions": [],
//                   "children": []
//                 },
//                 {
//                   "label": "Loan Department",
//                   "url": "#",
//                   "permissions": [],
//                   "children": []
//                 },
//                 {
//                   "label": "All Reports",
//                   "url": "#",
//                   "permissions": [],
//                   "children": []
//                 }
//               ]
//             },
//             {
//               "label": "Loan Department",
//               "url": "#",
//               "permissions": [],
//               "children": []
//             },
//             {
//               "label": "All Reports",
//               "url": "#",
//               "permissions": [],
//               "children": []
//             }
//           ]
//         },
//         {
//           "label": "Commercial Department",
//           "url": "#",
//           "permissions": [],
//           "children": [
//             {
//               "label": "Export Department",
//               "url": "#",
//               "permissions": [],
//               "children": []
//             },
//             {
//               "label": "Local Department",
//               "url": "#",
//               "permissions": [],
//               "children": []
//             },
//             {
//               "label": "All Department Reports",
//               "url": "#",
//               "permissions": [],
//               "children": [
//                 {
//                   "label": "Purchase Department",
//                   "url": "#",
//                   "permissions": [],
//                   "children": []
//                 },
//                 {
//                   "label": "Sales Department",
//                   "url": "#",
//                   "permissions": [],
//                   "children": []
//                 },
//                 {
//                   "label": "Loan Department",
//                   "url": "#",
//                   "permissions": [],
//                   "children": [
//                     {
//                       "label": "Purchase Department",
//                       "url": "#",
//                       "permissions": [],
//                       "children": []
//                     },
//                     {
//                       "label": "Sales Department",
//                       "url": "#",
//                       "permissions": [],
//                       "children": []
//                     },
//                     {
//                       "label": "Loan Department",
//                       "url": "#",
//                       "permissions": [],
//                       "children": []
//                     },
//                     {
//                       "label": "All Reports",
//                       "url": "#",
//                       "permissions": [],
//                       "children": []
//                     }
//                   ]
//                 },
//                 {
//                   "label": "All Reports",
//                   "url": "#",
//                   "permissions": [],
//                   "children": []
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]


    useEffect(() => {
       NodeService.getTreeTableNodes().then((data) => setNodes(data));
    }, []);
    return (
        <div className="card">
        <TreeTable value={nodes} tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" header="Name" expander></Column>
            <Column field="size" header="Size"></Column>
            <Column field="type" header="Type"></Column>
        </TreeTable>
    </div>
    );
};
export default MenuItem