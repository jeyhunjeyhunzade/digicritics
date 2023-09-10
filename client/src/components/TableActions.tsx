import DeleteIcon from "@app/assets/icons/DeleteIcon";
import EditIcon from "@app/assets/icons/EditIcon";
import { Review } from "@app/types/types";

interface TableActionsProps {
  review: Review;
}

const TableActions = (props: TableActionsProps) => {
  return (
    <div className="flex justify-center space-x-2">
      <DeleteIcon review={props.review} size={24} />
      <EditIcon review={props.review} size={24} />
    </div>
  );
};

export default TableActions;
