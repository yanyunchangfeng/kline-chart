import { createPersistStore } from 'src/utils/store';

const DEFAULT_STATE = {
  taskList: [] as any[]
};
export const useIntelligentTrainingTaskStore = createPersistStore(
  DEFAULT_STATE,
  (set, _get) => {
    function get() {
      return {
        ..._get(),
        ...methods
      };
    }
    const methods = {
      addTask(obj: any) {
        set(() => ({ taskList: [...get().taskList, obj] }));
      }
    };
    return methods;
  },
  {
    name: 'intelligentTrainingTask'
  }
);
