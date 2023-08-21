import { Status } from "@app/types/enums";
import { classNames } from "@app/utils";

const StatusPill = ({ value }: { value: Status }) => {
  const status = value ? value : "unknown";

  return (
    <span
      className={classNames(
        "leading-wide rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm",
        status.includes(Status.ACTIVE) ? "bg-[#cbf3bb] text-[#5c864b]" : null,
        status.includes(Status.BLOCKED) ? "bg-red-100 text-red-700" : null
      )}
    >
      {status}
    </span>
  );
};

export default StatusPill;
