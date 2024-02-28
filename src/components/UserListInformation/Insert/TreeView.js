import TreeNode from "./TreeNode";

const TreeView = ({ data ,clickedCheckboxes, setClickedCheckboxes,parentIds}) => {
    return (
      <div>
        {data.map((node) => (
          <TreeNode key={node._id.$oid} node={node} clickedCheckboxes={clickedCheckboxes}
          setClickedCheckboxes={setClickedCheckboxes} parentIds={parentIds}/>
        ))}
      </div>
    );
  };

  export default TreeView