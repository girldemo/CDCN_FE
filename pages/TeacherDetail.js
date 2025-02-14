import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Touchable } from "react-native";
import CourseList from "../components/CourseList/CourseList";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Alert, TouchableOpacity } from "react-native";

const TeacherDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { teacherID } = route.params;
  const [teacherDetail, setTeacherDetail] = useState({});
  useEffect(() => {
    const fetchApiTeacher = async () => {
      const res = await axios.get(
        `http://54.164.6.175:3000/api/teacher/${teacherID}`
      );
      setTeacherDetail(res.data.result);
    };

    fetchApiTeacher();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={
            teacherDetail && teacherDetail.avatar
              ? { uri: teacherDetail.avatar }
              : require("../components/Teacher/teacher.jpg") // Provide a default image
          }
          style={styles.teacherImage}
        />
        <View style={styles.col}>
          <Text style={styles.teacherName}>
            {teacherDetail &&
              teacherDetail.first_name + " " + teacherDetail.last_name}
          </Text>
          <Text style={styles.teacherEmail}>
            {teacherDetail && teacherDetail.mail}
          </Text>
        </View>
        <Text style={styles.phoneSymbol}>✆</Text>
      </View>
      <View style={styles.h2}>
        <Text>Info</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.h3}>Japanese level </Text>
          <Text style={styles.h4}>
            {teacherDetail.Teacher && teacherDetail.Teacher.jp_level}
          </Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.h3}>Experience</Text>
          <Text style={styles.h4}>
            {teacherDetail.Teacher && teacherDetail.Teacher.experience}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.h3}>Day of birth</Text>
          <Text style={styles.h4}>{teacherDetail && teacherDetail.dob}</Text>
        </View>
      </View>
      <Text style={styles.h2}>About me</Text>
      <View style={styles.row}>
        <Text style={styles.TeacherDetail}>
          {teacherDetail.Teacher && teacherDetail.Teacher.detail_infor}
        </Text>
      </View>

      <Text style={styles.h2}>My Courses</Text>
      <View style={styles.row}>
        <CourseList />
      </View>

      <TouchableOpacity
        style={styles.SetAppointmentBtn}
        onPress={() =>
          navigation.navigate("SetAppointment", { teacherID: teacherID })
        }
      >
        <Text>Add appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  h2: {
    fontSize: 23,
    marginTop: 15,
  },
  h3: {
    fontSize: 12,
    color: "gray",
  },
  h4: {
    fontSize: 13,
    fontWeight: "600",
  },
  teacherImage: {
    width: 50,
    height: 50,
    borderRadius: 50, // To make it a circle
    margin: 10,
    top: 5,
  },
  teacherName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
  },
  teacherEmail: {
    fontSize: 12,
  },
  phoneSymbol: {
    fontSize: 30,
    margin: 8,
  },
  messageSymbol: {
    fontSize: 22,
    margin: 10,
  },
  TeacherDetail: {
    fontSize: 14,
    margin: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  col: {
    flex: 1,
    width: 20,
    padding: 10,
    marginBottom: 10,
  },
  SetAppointmentBtn: {
    margin: 10,
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    alignItems: "center",
  },
});

export default TeacherDetail;
