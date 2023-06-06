import { View, Text, StyleSheet, Pressable } from "react-native";
import IconButton from "../../components/UI/IconButton";
import Button from "../../components/UI/Button";
// import Input from "../../components/ManageExpense/Input";
//npm i react-native-elements --save
import { Input } from "react-native-elements";
import { Icon } from "react-native-elements";
//npm install react-native-select-dropdown
//import SelectDropdown from "react-native-select-dropdown";
//npm install react-native-dropdown-picker
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

function ModalContent({ close }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "전자기기", value: "전자기기" },
    { label: "사무용품", value: "사무용품" },
  ]);

  //input창 누르면 적용
  function pressInput() {
    console.log("클릭");
  }

  return (
    <View style={styles.modalText}>
      <View style={styles.iconContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>검색조건 선택</Text>
        </View>
        <IconButton icon="close" color="black" size={25} onPress={close} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.contentContainer}>
          <View>
            <View>
              <Text>등록일자부분</Text>
            </View>
            <View style={styles.dataButtons}>
              <Button
                btnStyle={styles.dataButton}
                textStyle={styles.dateBtnText}
              >
                1주
              </Button>
              <Button
                btnStyle={styles.dataButton}
                textStyle={styles.dateBtnText}
              >
                1개월
              </Button>
              <Button
                btnStyle={styles.dataButton}
                textStyle={styles.dateBtnText}
              >
                3개월
              </Button>
              <Button
                btnStyle={styles.dataButton}
                textStyle={styles.dateBtnText}
              >
                직접입력
              </Button>
            </View>
          </View>
          <View style={{ width: 280 }}>
            <Text>프로젝트검색</Text>
            <Pressable
              onPress={pressInput}
              style={({ pressed }) => pressed && [styles.pressed]}
            >
              <Input
                rightIcon={<Icon name="search" size={24} color="black" />}
                inputContainerStyle={{
                  borderWidth: 1,
                  backgroundColor: "white",
                  height: 40,
                }}
                disabled={true}
              />
            </Pressable>
          </View>
          <View>
            {/* <SelectDropdown
              defaultButtonText="대분류"
              renderDropdownIcon={() => (
                <Icon name="arrow-drop-down" size={24} color="black" />
              )}
              buttonStyle={{
                borderWidth: 1,
                borderColor: "#cccccc",
              }}
              data={["전자기기", "사무용품", "기타"]}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            /> */}
            {/* 대분류에 따라 다르게 보여야한다 */}
            {/* <SelectDropdown
              defaultButtonText="중분류"
              renderDropdownIcon={() => (
                <Icon name="arrow-drop-down" size={24} color="black" />
              )}
              buttonStyle={{
                borderWidth: 1,
                borderColor: "#cccccc",
              }}
              
              data={[
                "모니터",
                "키보드",
                "어쩌구..",
                "모니터",
                "키보드",
                "어쩌구..",
                "모니터",
                "키보드",
                "어쩌구..",
              ]}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            /> */}
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              dropDownDirection="BOTTOM"
              translation={{
                PLACEHOLDER: "대분류",
              }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={close} style={styles.button}>
            선택완료
          </Button>
        </View>
      </View>
    </View>
  );
}

export default ModalContent;

const styles = StyleSheet.create({
  modalText: {
    width: 320,
    height: 500,
    backgroundColor: "white",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    // backgroundColor: "yellow",
  },
  textContainer: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 63,
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "yellow",
    marginTop: 30,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
  },
  dataButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dataButton: {
    borderRadius: 0,
    backgroundColor: "#cccccc",
  },
  dateBtnText: {
    color: "black",
  },
  pressed: {
    opacity: 0.75,
  },
});
