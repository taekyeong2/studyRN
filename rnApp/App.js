import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  //모달창 여부 (true, false) 상태
  const [modalIsVisible, setMoalIsVisival] = useState(false);
  //입력된 목표(배열) 상태
  const [courseGoals, setCourseGoals] = useState([]);

  //모달창 켜기
  function startAddGoalHandler() {
    setMoalIsVisival(true);
  }

  //모달창 끄기
  function endAddGoalHandler() {
    setMoalIsVisival(false);
  }

  // 새 목표 추가
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      //FlatList 의 renderItem의 매개변수 itemData(객체)
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    //모달창끄기
    endAddGoalHandler();
  }

  //목표 삭제
  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      //선택된 아이디가 아닌 것만 새로운 배열로
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#e4d0ff"
          onPress={startAddGoalHandler}
        />
        {/* 목표 입력모달창 */}
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            /* data -> 목록에서 출력한 데이터 지정
                      데이터 배열의 데이터가 객체 목록일때 더 잘 작동 */
            data={courseGoals}
            /* renderItem -> 개별 데이터 항목을 렌더링 지시 
            스크롤할때마다(새 항목 렌더링) 새로운 함수 호출
            모든 항목마다 렌더링 되어야 하는 jsx코드 생성*/
            renderItem={(itemData) => {
              return (
                //개별목표들
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            /*keyExtractor : 렌더링 되는 목록 항목마다 이 함수 호출
                            모든 항목에서 키를 가져오라고 호출 */
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
