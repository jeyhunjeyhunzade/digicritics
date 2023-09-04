import { UserStatus } from "@app/types/enums";
import { classNames } from "@app/utils";

const StatusPill = ({ value }: { value: UserStatus }) => {
  const status = value ? value : "unknown";

  return (
    <span
      className={classNames(
        "leading-wide rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm",
        status.includes(UserStatus.USER) ? "bg-[#99E7FF] text-[#1C5BB8]" : null,
        status.includes(UserStatus.ADMIN)
          ? "bg-[#cbf3bb] text-[#5c864b]"
          : null,
        status.includes(UserStatus.BLOCKED) ? "bg-red-100 text-red-700" : null
      )}
    >
      {status}
    </span>
  );
};

export default StatusPill;
