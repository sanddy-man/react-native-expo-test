import React, { Component } from "react";
import { Body, Container, Header, Content, Title, Right, Left, Button, Icon, Text, Switch } from 'native-base';
import { Lists } from "../../components";
import { TaskDetailModal } from "../../components/modals";
import multilingual from "../../config/multilingual";

class TodoHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetailModalIsOpen: false,
      selectedTaskId: null,
      taskDetail: null,
    };
  }

  openTaskDetailModal(taskId) {
    this.setState({
      taskDetailModalIsOpen: true,
      selectedTaskId: taskId,
      taskDetail: this.getTaskDetail(taskId),
    });
  }

  openNewTaskModal() {
    this.setState({
      taskDetailModalIsOpen: true,
      selectedTaskId: null,
      taskDetail: null,
    })
  }

  closeTaskDetailModal() {
    this.setState({
      taskDetailModalIsOpen: false,
      selectedTaskId: null,
      taskDetail: null,
    });
  }

  getTaskDetail(taskId) {
    return this.props.todoList.find(task => task.todo_list_id === taskId);
  }

  getCheckListDetail(listId) {
    return this.props.checkList.find(list => list.check_list_id === listId)
  }

  onComplete(taskId) {
    this.props.onCheckTask(taskId);
    this.closeTaskDetailModal();
  }

  onDelete(taskId) {
    this.props.onDeleteTask(taskId);
    this.closeTaskDetailModal();
  }

  onAddTask(taskDetail) {
    const {lang} = this.props
    if (!taskDetail) {
      alert(multilingual.PLEASE_FILL_NAME[lang] + ' ' + multilingual.AND[lang] + ' ' + multilingual.SELECT_CHECKLIST[lang]);
      return;
    }
    if (!taskDetail.name || !taskDetail.check_list_id) {
      alert(multilingual.PLEASE_FILL_NAME[lang] + ' ' + multilingual.AND[lang] + ' ' + multilingual.SELECT_CHECKLIST[lang])
      return;
    }
    this.props.onAddTask({...taskDetail, checked: '0'});
    this.closeTaskDetailModal()
  }

  onUpdateTask(taskDetail) {
    const {lang} = this.props
    if (!taskDetail) {
      alert(multilingual.PLEASE_FILL_NAME[lang] + ' ' + multilingual.AND[lang] + ' ' + multilingual.SELECT_CHECKLIST[lang]);
      return;
    }
    if (!taskDetail.name || !taskDetail.check_list_id) {
      alert(multilingual.PLEASE_FILL_NAME[lang] + ' ' + multilingual.AND[lang] + ' ' + multilingual.SELECT_CHECKLIST[lang])
      return;
    }
    this.props.onUpdateTask(taskDetail);
    this.closeTaskDetailModal()
  }

  onDetailChange(newValue) {
    this.setState({
      taskDetail: newValue
    });
  }

  render() {
    const {lang} = this.props
    return (
      <Container>
        <Header>
          <Left>
            {/* <Switch
              onValueChange={() => this.props.toggleView()}
              value={this.props.viewMode === '1'}
              style={{ marginLeft: 10 }}
            /> */}
          </Left>
          <Body>
            <Title>{multilingual.TO_DO[lang]}</Title>
          </Body>
          <Right>
            <Button onPress={() => this.openNewTaskModal()} transparent>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Lists.TodoList
            content={this.props.content}
            onCheckTask={taskId => this.props.onCheckTask(taskId)}
            onPress={taskId => this.openTaskDetailModal(taskId)}
          />
          <Button full light style={{ marginVertical: 10, backgroundColor: '#ebe0c9' }} onPress={() => this.props.toggleView()}>
            <Text>{this.props.viewMode === '1'
              ? 'Hide Completed'
              : 'Show Completed'
            }</Text>
          </Button>
        </Content>
        <TaskDetailModal
          taskDetailModalIsOpen={this.state.taskDetailModalIsOpen}
          closeTaskDetailModal={() => this.closeTaskDetailModal()}
          selectedTaskId={this.state.selectedTaskId}
          taskDetail={this.state.taskDetail}
          onComplete={(taskId) => this.onComplete(taskId)}
          onAddTask={(taskDetail) => this.onAddTask(taskDetail)}
          onDelete={(taskId) => this.onDelete(taskId)}
          onUpdateTask={(taskDetail) => this.onUpdateTask(taskDetail)}
          getCheckListDetail={(listId) => this.getCheckListDetail(listId)}
          onDetailChange={(newValue) => this.onDetailChange(newValue)}
          checkList={this.props.checkList}
          onCreateCheckList={this.props.onCreateCheckList}
        />
      </Container>
    );
  }
}

export default TodoHome;
