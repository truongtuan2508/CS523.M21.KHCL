//treap implementation
function aTreap() {
     // init global values
     var root = null;
     var depth = 0;
     var size = 0;
     var stepfunction = undefined;
     var ind = 0;
     var indnul = 10000;

     function running() {
          return isDefined(stepfunction);
     }
     this.ready = function () {
          return !running();
     };
     this.length = function () {
          return root == null ? size : size;
     };
     this.getRoot = function () {
          return root;
     };

     this.step = function () {
          if (isDefined(stepfunction)) stepfunction();
     };

     this.skip = function () {
          while (running()) this.step();
     };

     this.children = function (index) {
          var arr = [];
          if (index.val == "nul") {
               return arr;
          }
          arr.push(index.left);
          arr.push(index.right);
          return arr;
     };

     this.childrensInd = function (index) {
          var arr = [];
          if (index.val == "nul") {
               return arr;
          }
          arr.push(index.left.index);
          arr.push(index.right.index);
          return arr;
     };

     var _i = undefined;
     var _j = undefined;
     var _k = undefined;
     this.i = function () {
          return _i;
     };
     this.j = function () {
          return _j;
     };
     this.k = function () {
          return _k;
     };

     // finds the last position the key belongs on.
     function find_last(key) {
          if (isNaN(key)) {
               alert("Error: not a number");
               return;
          }
          var temp = root;
          var prev = null;
          while (temp != null && temp.val != "nul") {
               prev = temp;
               if (key < temp.val) {
                    temp = temp.left;
               } else if (key > temp.val) {
                    temp = temp.right;
               } else {
                    return temp;
               }
          }
          return prev;
     }

     // checks before adding a node.
     function add_node(node) {
          var p = find_last(node.val);
          return add_child(p, node);
     }

     // checks if node could be added.
     function add_child(p, u) {
          if (p == null) {
               root = u;
          } else {
               if (u.val < p.val) {
                    p.left = u;
               } else if (u.val > p.val) {
                    p.right = u;
               } else {
                    alert("Error: number is already in the tree");
                    return false;
               }
               u.parent = p;
          }
          size++;
          return true;
     }

     function splice(u) {
          //console.log("here");
          var temp;
          var p;
          if (u.left.val != "nul") {
               temp = u.left;
          } else {
               temp = u.right;
          }
          if (u == root) {
               root = temp;
               p = null;
          } else {
               p = u.parent;
               if (p.left == u) {
                    p.left = temp;
               } else {
                    p.right = temp;
               }
          }
          if (temp != null) {
               temp.parent = p;
          }
          size--;
     }

     function rotate_left(u) {
          var temp = u.right;
          temp.parent = u.parent;
          //stepfunction = function(){
          if (temp.parent != null) {
               if (temp.parent.left == u) {
                    temp.parent.left = temp;
               } else {
                    temp.parent.right = temp;
               }
          }
          u.right = temp.left;
          if (u.right.val != "nul") {
               u.right.parent = u;
          }
          u.parent = temp;
          temp.left = u;
          if (u == root) {
               root = temp;
               root.parent = null;
          }
          //}
     }

     function rotate_right(u) {
          var temp = u.left;
          temp.parent = u.parent;
          //stepfunction = function(){
          if (temp.parent != null) {
               if (temp.parent.left == u) {
                    temp.parent.left = temp;
               } else {
                    temp.parent.right = temp;
               }
          }
          u.left = temp.right;
          if (u.left.val != "nul") {
               u.left.parent = u;
          }
          u.parent = temp;
          temp.right = u;
          if (u == root) {
               root = temp;
               root.parent = null;
          }
          //}
     }

     function bubble_up(u) {
          var p = u.parent;

          if (u != root && p.priority > u.priority) {
               _i = u;
               _j = p;
               stepfunction = function () {
                    if (p.right == u) {
                         rotate_left(p);
                    } else if (p.left == u) {
                         rotate_right(p);
                    }
                    bubble_up(u);
               };
               return;
          }
          if (p == null) {
               root = u;
          }
          _i = undefined;
          _j = undefined;
          _k = undefined;
          stepfunction = undefined;
     }

     function trickle_down(u) {
          if (u.left.val != "nul" || u.right.val != "nul") {
               _i = u;
               stepfunction = function () {
                    if (u.left.val == "nul") {
                         _j = u.left;
                         _k = u.right;
                         rotate_left(u);
                    } else if (u.right.val == "nul") {
                         _k = u.left;
                         _j = u.right;
                         rotate_right(u);
                    } else if (u.left.priority < u.right.priority) {
                         _k = u.left;
                         _j = u.right;
                         rotate_right(u);
                    } else {
                         _j = u.left;
                         _k = u.right;
                         rotate_left(u);
                    }
                    if (root == u) {
                         root = u.parent;
                    }
                    trickle_down(u);
               };
               return;
          }
          _i = undefined;
          _j = undefined;
          _k = undefined;
          stepfunction = undefined;
          splice(u);
          return;
     }

     this.insert = function (newVal) {
          if (running()) {
               alert("Error: processing");
               return;
          }
          if (isNaN(newVal)) {
               alert("Error: not a number");
               return;
          }

          // Create the node and randomly assign it a priority
          var node = { val: newVal, priority: Math.ceil(Math.random() * 100), index: ind };
          node.left = { val: "nul", index: indnul++ };
          node.right = { val: "nul", index: indnul++ };
          ind++;
          if (add_node(node)) {
               bubble_up(node);
               return true;
          }
          return false;
     };

     this.insert_p = function (newVal, pri) {
          if (running()) {
               alert("Error: processing");
               return;
          }
          if (isNaN(newVal)) {
               alert("Error: not a number");
               return;
          }
          if (isNaN(pri)) {
               alert("Error: not a number");
               return;
          }
          // Create the node with a specific priority
          var node = { val: newVal, priority: pri, index: ind };
          node.left = { val: "nul", index: indnul++ };
          node.right = { val: "nul", index: indnul++ };
          ind++;
          if (add_node(node)) {
               bubble_up(node);
               return true;
          }
          return false;
     };

     this.remove = function (value) {
          var node = find_last(value);
          if (node != null && node.val == value) {
               trickle_down(node);

               return true;
          }
          return false;
     };

     this.preOrder = function () {
          var result = [];
          var node = root;
          var traverse = function (node) {
               result.push(node.val);
               if (node.left.val != "nul") {
                    traverse(node.left);
               }
               if (node.right.val != "nul") {
                    traverse(node.right);
               }
          };
          traverse(node);
          return result;
     };
}

aTreap.random = function (d) {
     if (!isNumber(d) || d < 0) d = rnd(1, 6);

     var h = new aTreap();
     var arr = [];

     while (arr.length != d) {
          var x = rnd(-d, d);
          if (!arr.includes(x)) {
               arr.push(x);
          }
     }

     for (var i = 0; i < d; i++) {
          h.insert(arr[i]);
          h.skip();
     }

     return h;
};
