import DeleteIcon from "@app/assets/icons/DeleteIcon";
import EditIcon from "@app/assets/icons/EditIcon";

const TableActions = () => {
  return (
    <div className="flex justify-center space-x-2">
      <DeleteIcon size={24} />
      <EditIcon size={24} />
    </div>
  );
};

export default TableActions;
