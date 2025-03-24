# Feedback for the Automation Exercise

## TASK 1: Update Button Issue

### Problem:
- I faced difficulties when trying to access the **"Update"** button on the landing page.
- The issue was caused by the button not having a unique ID.
- Another button in the account name section shared the same ID, causing a conflict and making it difficult to select the correct button.

### Approach:
I tried several approaches using **DevTools** to find the correct selector:
- Tried the "Copy selector" option but it didn’t work due to the ID conflict.
- Tried using `fdprocessedid` and "Copy JS path," but these also didn’t work.

### Solution:
- I added an extra condition to differentiate the "Update" button based on its classes:
  - The active button had a different class compared to the disabled one.
  - This allowed me to correctly identify and select the button.

### Suggestions for Improvement:
- **Unique IDs:** Assign unique IDs to important buttons for easier identification.
- **No Duplicate IDs:** Avoid duplicating IDs on the page to ensure each element can be uniquely targeted.

---

## TASK 2: No Data Found Message

### Problem:
- I had difficulty accessing the **"No data found"** message when there were no search results.
- The selector for the message was found, but accessing it wasn’t straightforward due to the page’s dynamic structure and overlapping elements.

### Approach:
I initially tried different methods using **DevTools** and selectors, but they didn’t work smoothly due to:
- Inconsistent page loading.
- Overlapping elements that complicated pinpointing the exact location of the message.

### Solution:
- I implemented a function that checks for the **"No data found"** message and ensures that the results list is empty.
- This resolved the issue, and the test now correctly handles invalid search cases.

### Suggestions for Improvement:
- **Consistent Selectors:** The "No data found" message should have a more consistent or unique selector for easier access in automated tests.
- **Stable Page Structure:** A more stable page structure could help reduce the complexity of finding elements like error messages or empty results.
- **Page Load Synchronization:** Improving page load synchronization could help avoid delays and make automated tests more reliable.

---

## Conclusion:
The feedback highlights two challenges faced during the automation exercise and provides suggestions for improving the system to make automation smoother and more reliable in the future.
