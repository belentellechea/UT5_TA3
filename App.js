import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function generateId() {
  return Math.random();
}

export default function App() {
  const [task, setTask] = useState(''); 
  const [tasks, setTasks] = useState([]); 

  function addTask(){
    if (task.trim()) { //corrobora que no se añada un string vacío
      const newTask = { id: generateId(), text: task };
      setTasks([...tasks, newTask]); 
      setTask(''); 
    }
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de tareas</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Agrega una nueva tarea aquí'
          style = {styles.input}
          value = {task}
          onChangeText= {setTask}
        />
        <Pressable style={styles.inputButton} onPress={addTask}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        <FlatList 
          data={tasks}
          renderItem={({item}) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.text}</Text>
              <Pressable style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
                <Icon name="trash" size={15}/>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5D9',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  list: {
    flex: 1,
    width: "90%"
  }, 
  title: {
    fontSize: 40, 
    fontFamily: "Times New Roman",
    fontWeight: "bold"
  }, 
  inputContainer: {
    flexDirection: "row",
    width: "90%", 
    gap: 10, 
    margin: 20
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
    fontFamily: 'Times New Roman',
    textAlign: 'center'
  }, 
  inputButton: {
    backgroundColor: "#FEC89A",
    padding: 10,
    fontSize: 20,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Times New Roman',
    fontWeight: "bold"
  }, 
  taskItem: {
    backgroundColor: '#FFD7BA',
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 20,
    fontFamily: "Times New Roman"
  }, 
  deleteButton: {
    backgroundColor: "#FEC89A",
    padding: 15,
    borderRadius: 50
  }
});
