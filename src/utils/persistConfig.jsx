import {
  courseNameOptions as defaultCourseNames,
  moduleCoordinatorName as defaultCoordinators,
  moduleNameList as defaultModules,
  facultyNameList as defaultFaculty,
} from "../config/masterData";

const STORAGE_KEY = "pie_generator_master";

export const loadMasterData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        courseNameOptions: defaultCourseNames,
        moduleCoordinatorName: defaultCoordinators,
        moduleNameList: defaultModules,
        facultyNameList: defaultFaculty,
      };
    }
    const overrides = JSON.parse(stored);
    return {
      courseNameOptions: overrides.courseNameOptions ?? defaultCourseNames,
      moduleCoordinatorName:
        overrides.moduleCoordinatorName ?? defaultCoordinators,
      moduleNameList: overrides.moduleNameList ?? defaultModules,
      facultyNameList: overrides.facultyNameList ?? defaultFaculty,
    };
  } catch {
    return {
      courseNameOptions: defaultCourseNames,
      moduleCoordinatorName: defaultCoordinators,
      moduleNameList: defaultModules,
      facultyNameList: defaultFaculty,
    };
  }
};

export const saveMasterData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const resetMasterData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const exportConfig = () => {
  const stored = localStorage.getItem(STORAGE_KEY) || "{}";
  const blob = new Blob([stored], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pie_generator_config.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const importConfig = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        resolve(data);
      } catch {
        reject(new Error("Invalid config file"));
      }
    };
    reader.readAsText(file);
  });
};
