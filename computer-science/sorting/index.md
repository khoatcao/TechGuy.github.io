---
layout: default
title: Sorting Algorithms
category: computer-science
---

# 🔄 Sorting Algorithms

A comprehensive guide to various sorting algorithms with implementations and analysis.

## 📊 Algorithm Comparison

| Algorithm | Best Case | Average Case | Worst Case | Space Complexity | Stable |
|-----------|-----------|--------------|------------|------------------|---------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ |

## 🫧 Bubble Sort

**Time Complexity**: O(n²)  
**Space Complexity**: O(1)  
**Stable**: Yes

Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # Flag to optimize - if no swaps occur, array is sorted
        swapped = False
        
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swapping occurred, array is sorted
        if not swapped:
            break
    
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr.copy())
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")
```

## 🎯 Selection Sort

**Time Complexity**: O(n²)  
**Space Complexity**: O(1)  
**Stable**: No

Selection Sort divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly selects the smallest element from the unsorted sublist and places it at the end of the sorted sublist.

```python
def selection_sort(arr):
    n = len(arr)
    
    for i in range(n):
        # Find the minimum element in unsorted array
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = selection_sort(arr.copy())
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")
```

## 📝 Insertion Sort

**Time Complexity**: O(n²)  
**Space Complexity**: O(1)  
**Stable**: Yes

Insertion Sort builds the final sorted array one item at a time. It's much less efficient on large lists than more advanced algorithms like quicksort, heapsort, or merge sort.

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Move elements of arr[0..i-1] that are greater than key
        # to one position ahead of their current position
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key
    
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = insertion_sort(arr.copy())
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")
```

## 🔀 Merge Sort

**Time Complexity**: O(n log n)  
**Space Complexity**: O(n)  
**Stable**: Yes

Merge Sort is a divide-and-conquer algorithm that recursively breaks down the problem into smaller subproblems until they become simple enough to solve directly.

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Divide the array into two halves
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = merge_sort(arr.copy())
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")
```

## ⚡ Quick Sort

**Time Complexity**: O(n log n) average, O(n²) worst  
**Space Complexity**: O(log n)  
**Stable**: No

Quick Sort is a highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy.

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

# Alternative implementation with in-place sorting
def quick_sort_inplace(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort_inplace(arr, low, pi - 1)
        quick_sort_inplace(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = quick_sort(arr.copy())
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")
```

## 🗃️ Heap Sort

**Time Complexity**: O(n log n)  
**Space Complexity**: O(1)  
**Stable**: No

Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element.

```python
def heap_sort(arr):
    n = len(arr)
    
    # Build a max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Swap
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    # Check if left child exists and is greater than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # Check if right child exists and is greater than largest
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # Change root if needed
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = heap_sort(arr.copy())
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")
```

## 🧪 Testing and Benchmarking

Here's a simple benchmark to compare the performance of different sorting algorithms:

```python
import time
import random

def benchmark_sorting_algorithms():
    # Generate test data
    test_sizes = [100, 1000, 10000]
    algorithms = {
        'Bubble Sort': bubble_sort,
        'Selection Sort': selection_sort,
        'Insertion Sort': insertion_sort,
        'Merge Sort': merge_sort,
        'Quick Sort': quick_sort,
        'Heap Sort': heap_sort
    }
    
    for size in test_sizes:
        print(f"\n--- Testing with {size} elements ---")
        arr = [random.randint(1, 1000) for _ in range(size)]
        
        for name, algorithm in algorithms.items():
            test_arr = arr.copy()
            start_time = time.time()
            algorithm(test_arr)
            end_time = time.time()
            
            print(f"{name}: {end_time - start_time:.4f} seconds")

# Run benchmark
if __name__ == "__main__":
    benchmark_sorting_algorithms()
```

## 📚 Further Reading

- [Big O Notation Explained](/computer-science/big-o-notation/)
- [Data Structures Overview](/computer-science/data-structures/)
- [Algorithm Analysis Techniques](/computer-science/algorithm-analysis/)
- [Sorting Algorithm Visualizations](https://visualgo.net/en/sorting)

---

*"The best sorting algorithm is the one that's already implemented and working in your codebase."* - Unknown
