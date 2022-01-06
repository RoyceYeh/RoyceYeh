<template>
	<section class="todo">
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text" id="basic-addon1">待辦事項</span>
			</div>
			<input
				type="text"
				class="form-control"
				placeholder="準備要做的任務"
				v-model="newTodo"
				@keyup.enter="addTodo"
			/>
			<div class="input-group-append">
				<button class="btn btn-primary" type="button" @click="addTodo">
					新增
				</button>
			</div>
		</div>
		<div class="card text-center">
			<div class="card-header">
				<ul class="nav nav-tabs card-header-tabs">
					<li class="nav-item">
						<a
							class="nav-link"
							:class="{ active: visibility == 'all' }"
							@click="visibility = 'all'"
							href="#"
							>全部</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							:class="{ active: visibility == 'active' }"
							@click="visibility = 'active'"
							href="#"
							>進行中</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							:class="{ active: visibility == 'completed' }"
							@click="visibility = 'completed'"
							href="#"
							>已完成</a
						>
					</li>
				</ul>
			</div>
			<ul class="list-group list-group-flush text-left">
				<li
					class="list-group-item"
					v-for="item in filterTodos"
					v-bind:key="item.id"
					@dblclick="edit(item)"
				>
					<!-- 正常狀況都沒點擊的話，editTodo為空的物件，item.id !== editTodo.id 自然為True -->
					<div class="d-flex" v-if="item.id !== editTodo.id">
						<div class="form-check">
							<input
								type="checkbox"
								class="form-check-input"
								:id="item.id"
								v-model="item.completed"
							/>
							<label
								class="form-check-label"
								:class="{ completed: item.completed }"
								:for="item.id"
							>
								{{ item.title }}
							</label>
						</div>
						<button
							type="button"
							class="close ml-auto"
							aria-label="Close"
							@click="removeTodo(item)"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<input
						type="text"
						class="form-control"
						v-if="item.id == editTodo.id"
						@keyup.esc="cancelEdit()"
						@keyup.enter="doneEdit(item)"
						v-model="editTodo.title"
					/>
				</li>
				<!-- <li class="list-group-item">
                  <input type="text" class="form-control" />
                </li> -->
			</ul>
			<div class="card-footer d-flex justify-content-between">
				<span>還有 3 筆任務未完成</span>
				<a href="#">清除所有任務</a>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: "TodoList",
		// props: {
		//   msg: String,
		// },
		data() {
			return {
				newTodo: "",
				todos: [],
				editTodo: {},
				editTitle: "",
				visibility: "all",
			};
		},
		methods: {
			addTodo() {
				//使用者輸入內容
				//trim()刪除空白
				let value = this.newTodo.trim();
				//id
				let timesTamp = Math.floor(Date.now());
				//如果空白，則不能新增
				if (!value) {
					return;
				}
				console.log(value, timesTamp);
				//新增物件進todos
				this.todos.push({
					id: timesTamp,
					title: value,
					completed: false,
				});
				//輸入後清除
				this.newTodo = "";
			},

			removeTodo(item) {
				let newIndex = this.todos.findIndex(function (task) {
					return item.id === task.id;
				});

				this.todos.splice(newIndex, 1);
			},

			edit(item) {
				console.log(item);
				this.editTodo = item;
				this.editTitle = item.title;
			},

			cancelEdit() {
				this.editTodo = {};
			},

			doneEdit(item) {
				item.title = this.editTodo.title;
				this.editTitle = ""; //輸入完清空
				this.editTodo = {};
				//沒有雙擊任何一個todo的狀況下，editTodo本來就是空的，雙擊後才會出現input，所以在input編輯完後，要跳回原本checkbox的樣子，要回到editTodo是空的狀態。
			},
		},
		computed: {
		  //過濾後的todos
		  filterTodos() {
			let activeTodos = [];
		    if (this.visibility == "all") {
		      activeTodos = this.todos;
		    } else if (this.visibility == "active") {
		      //接收未完成的內容
		      this.todos.forEach(function (item) {
		        if (item.completed == false) {
		          activeTodos.push(item);
		        }
		      });
		    } else if (this.visibility == "completed") {
		      //接收未完成的內容
		      this.todos.forEach(function (item) {
		        if (item.completed == true) {
		          activeTodos.push(item);
		        }
		      });		      
		    }
			return activeTodos;
		  },
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.todo {
		max-width: 600px;
		margin: 0 auto;
	}
	.completed {
		text-decoration: line-through;
	}
</style>
