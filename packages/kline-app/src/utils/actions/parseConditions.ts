import { LevelLimit } from "common/types";

export function parseCondition(value: LevelLimit) {
  const copy = { ...value };
  if (value.level_1) {
    copy.level_1 = {
      total: parseFloat(value.level_1.total as string),
      type: value.level_1.type,
    };
  }
  if (value.level_2) {
    copy.level_2 = {
      total: parseFloat(value.level_2.total as string),
      type: value.level_2.type,
    };
  }

  return copy;
}
