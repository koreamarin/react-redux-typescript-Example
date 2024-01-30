import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 상태에서 사용할 할일 항목의 타입정의
export type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

// 상태에 대한 타입
export type TodoState = Todo[];

// 초기상태 선언
const initialState: TodoState = [];

let nextId = 1;

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      // reducer는 action을 처리하는 함수이다. state를 업데이트하는 로직을 담고 있다. prepare보다 늦게 실행된다.
      reducer: (state, action: PayloadAction<{ id: number; text: string }>) => {
        state.push({ id: action.payload.id, text: action.payload.text, isDone: false });
      },
      // prepare은 액션 생성자가 호출될 때 실행되어 필요한 작업을 수행한다. 즉, addTodo를 호출할 때 자동으로 prepare함수가 호출되어 payload값을 수정한다. 
      prepare: (text: string) => ({ payload: { id: nextId++, text } }),   
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload); // find는 배열의 요소를 하나씩 순회하면서 조건에 맞는 요소를 찾고, 찾으면 찾은 원소를 반환한다.
      if (todo) { // todo가 있으면. 즉, todo가 undefined가 아니면
        todo.isDone = !todo.isDone;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((todo) => todo.id === action.payload); // findIndex는 배열의 요소를 하나씩 순회하면서 조건에 맞는 요소의 인덱스를 반환한다.
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
