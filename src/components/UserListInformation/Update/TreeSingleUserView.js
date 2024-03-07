import TreeSingleUserNode from "./TreeSingleUserNode";

const TreeSingleUserView = ({ data ,clickedCheckboxes, setClickedCheckboxes,parentIds,singleUserData}) => {
    return (
      <div>
        {data?.map((node) => (
          <TreeSingleUserNode
          key={node._id.$oid} node={node} clickedCheckboxes={clickedCheckboxes}
          setClickedCheckboxes={setClickedCheckboxes} parentIds={parentIds} 
          singleUserData={singleUserData} 
           data={data}
           />
        ))}
      </div>
    );
  };

  export default TreeSingleUserView