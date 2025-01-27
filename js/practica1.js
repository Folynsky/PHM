class Person {
  constructor(firstname, lastname, age, gender) {
    this.name = {
      first: firstname,
      last: lastname,
    };
    this.age = age;
    this.gender = gender;
    this.getName = function () {
      return this.name.first + " " + this.name.last;
    };
    this.bio = function () {
      return "I am " + this.age + " years old, " + this.gender;
    };
    this.greeting = function () {
      alert("Skibidi chamba " + this.name.first);
    };
  }
}

var person1 = new Person("Chambeador", "pomni", 12, "toilet");
person1.name;
person1.greeting();

var person2 = Object.create(person1);

class Professor extends Person {
  teaches;

  constructor(first, last, teaches) {
    super(first,last, 45, "female", ["math", "physics"]);
    this.teaches = teaches;
  }
  teachingBio(){
    return "i am a professor, teaching " + this.teaches
  }
}

var person4 = new Professor("Esquizo", "Frenia", "toilet");
