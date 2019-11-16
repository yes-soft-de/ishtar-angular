# Ishtar Front End Project

### Project Overview:

Create a Front End Project.

Just found out, that i'm a good es6 JS developer, or fast... at least



## Changes

Server Side Fully Consumed in the new Arch.



## Current Errors

1. Preflight Should be Enabled By the Backend, that's why some requests is not gonna happen.

2. Infinite Loop in the edit profile save functionality.



## Usage Notes



1. Every Widget/Component Connect to <u>Single</u> Manager Service
2. The Connection Goes As:

```typescript
constructor (private manager: ThatManager){
    // (2) This Marks the End of the Bellow Sequence
    manager.getObservable().subscribe(
        data => {
            // This Shall Be Provided in a Reference
        }, error => {
            // This is Just a String Explaining The Error
        }
    );
    
    // (1) This Starts The Sequence
    manager.requestSomeInternalMethod();
}
```



I Choose to subscribe first to ensure that the subject is listening before any event happen, this is very important in case of browser-based errors, since it's super fast to occur.